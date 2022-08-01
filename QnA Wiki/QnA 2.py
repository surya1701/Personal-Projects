import torch
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
from flask import Flask, render_template, url_for, request
import wikipedia as wiki
from collections import OrderedDict


class DocumentReader:
    def __init__(self, pretrained_model_name_or_path="csarron/bert-base-uncased-squad-v1"):
        self.READER_PATH = pretrained_model_name_or_path

    def get_answer(self, question, text):
        qa_pipeline = pipeline(
                "question-answering",
                model="csarron/bert-base-uncased-squad-v1",
                tokenizer="csarron/bert-base-uncased-squad-v1"
        )

        predictions = qa_pipeline({
                'context': text,
                'question': question
        })

        print(predictions)
        return predictions['answer']


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
        page = wiki.page(results[0][:-1])
        print(f"Top wiki result: {page}")
        text = page.content
        answer = reader.get_answer(question, text)
        print(f"Answer: {answer}")
        return render_template('result.html', prediction=answer)
    return render_template('result.html', prediction="NA")


if __name__ == '__main__':
    reader = DocumentReader("csarron/bert-base-uncased-squad-v1")
    app.run(debug=True)
