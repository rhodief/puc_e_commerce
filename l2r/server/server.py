import http.server
import socketserver
import json

PORT = 8080
ARQUIVO_PRODUTOS = '../products.json'

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            with open(ARQUIVO_PRODUTOS, 'r') as file:
                data = json.load(file)
                self.wfile.write(json.dumps(data).encode())
        else:
            super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*') 
        super().end_headers()

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Servindo na porta {PORT}")
    httpd.serve_forever()
