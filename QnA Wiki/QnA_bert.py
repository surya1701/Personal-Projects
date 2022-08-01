import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering
from flask import Flask, render_template, url_for, request
import wikipedia as wiki
from collections import OrderedDict


class DocumentReader:
    def __init__(self, path="csarron/bert-base-uncased-squad-v1"):
        self.tokenizer = AutoTokenizer.from_pretrained(path)
        self.model = AutoModelForQuestionAnswering.from_pretrained(path)
        self.max_len = self.model.config.max_position_embeddings
        self.divided = False

    def tokenize(self, question, text):
        self.inputs = self.tokenizer.encode_plus(question, text, add_special_tokens=True, return_tensors="pt")
        self.input_ids = self.inputs["input_ids"].tolist()[0]

        if len(self.input_ids) > self.max_len:
            self.inputs = self.divide()
            self.divided = True

    def divide(self):
        mask = self.inputs['token_type_ids'].lt(1)
        qt = torch.masked_select(self.inputs['input_ids'], mask)
        divided_input = OrderedDict()
        for k, v in self.inputs.items():
            q = torch.masked_select(v, mask)
            c = torch.masked_select(v, ~mask)
            divisions = torch.split(c, self.max_len - qt.size()[0] - 1)

            for i, d in enumerate(divisions):
                if i not in divided_input:
                    divided_input[i] = {}

                thing = torch.cat((q, d))
                if i != len(divisions) - 1:
                    if k == 'input_ids':
                        thing = torch.cat((thing, torch.tensor([102])))
                    else:
                        thing = torch.cat((thing, torch.tensor([1])))

                divided_input[i][k] = torch.unsqueeze(thing, dim=0)
        return divided_input

    def get_answer(self):
        if self.divided:
            answer = ''
            for k, chunk in self.inputs.items():
                answer_start_scores, answer_end_scores = self.model(**chunk, return_dict=False)

                answer_start = torch.argmax(answer_start_scores)
                answer_end = torch.argmax(answer_end_scores) + 1

                ans = self.tokenizer.convert_tokens_to_string(self.tokenizer.convert_ids_to_tokens(chunk['input_ids'][0][answer_start:answer_end]))
                if ans[:5] != '[CLS]' and len(ans) > 0:
                    if len(answer) == 0:
                        answer += ans
                    else:
                        answer += " & " + ans
            return answer
        else:
            start_scores, end_scores = self.model(**self.inputs, return_dict=False)
            start = torch.argmax(start_scores)
            end = torch.argmax(end_scores) + 1

            return self.tokenizer.convert_tokens_to_string(self.tokenizer.convert_ids_to_tokens(self.inputs['input_ids'][0][start:end]))


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['question']
        question = str(message)
        print(f"Question: {question}")
        results = wiki.search(question)
        print(results[:10])
        print(results[0][:-1])
        page = 0
        try:
            page = wiki.page(results[0][:-1])
        except:
            page = wiki.page(results[0])
        print(f"Top wiki result: {page}")
        text = page.content
        reader.tokenize(question, text)
        answer = reader.get_answer()
        print(f"Answer: {answer}")
        return render_template('result.html', prediction=answer)
    return render_template('result.html', prediction="NA")


if __name__ == '__main__':
    reader = DocumentReader("csarron/bert-base-uncased-squad-v1")
    app.run(debug=True)

