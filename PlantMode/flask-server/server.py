from flask import Flask

app = Flask(__name__)

# API Route

@app.route('/weathers')
def weathers():
    return {"weathers": ["Very wet", "Moderately wet", "Near normal", "Moderately dry", "Very dry"]}

if __name__ == "__main__":
    app.run(debug=True)