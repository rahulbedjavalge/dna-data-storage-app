from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def encode_to_dna(text):
    return ''.join(format(ord(c), '08b') for c in text).replace('00', 'A').replace('01', 'C').replace('10', 'G').replace('11', 'T')

def decode_from_dna(dna):
    binary = dna.replace('A', '00').replace('C', '01').replace('G', '10').replace('T', '11')
    return ''.join(chr(int(binary[i:i+8], 2)) for i in range(0, len(binary), 8))

@app.route('/api/encode', methods=['POST'])
def encode():
    data = request.json
    text = data.get('text', '')
    return jsonify({'dna': encode_to_dna(text)})

@app.route('/api/decode', methods=['POST'])
def decode():
    data = request.json
    dna = data.get('dna', '')
    return jsonify({'text': decode_from_dna(dna)})

if __name__ == '__main__':
    app.run()
