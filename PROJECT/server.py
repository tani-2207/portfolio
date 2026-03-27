from flask import Flask, request, jsonify, send_from_directory, render_template_string
from flask_cors import CORS
import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(__file__))
from database import init_database, add_contact, get_visitor_count, increment_visitor_count, get_all_contacts

app = Flask(__name__, static_folder='.')
CORS(app)

# Initialize database on startup
init_database()

# Serve static files
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/admin')
def admin():
    """Admin page to view all contact messages"""
    contacts = get_all_contacts()
    
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin - Contact Messages</title>
        <style>
            body {
                font-family: 'Courier New', monospace;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #fff;
                padding: 20px;
                margin: 0;
            }
            h1 {
                text-align: center;
                color: #ffd700;
                text-shadow: 0 0 20px #ffd700, 0 0 40px #ffd700;
                font-size: 2.5rem;
                margin-bottom: 10px;
            }
            .subtitle {
                text-align: center;
                color: #fff;
                font-size: 1.2rem;
                margin-bottom: 30px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 10px;
                overflow: hidden;
            }
            th, td {
                padding: 15px;
                text-align: left;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            th {
                background: rgba(0, 0, 0, 0.3);
                color: #ffd700;
                font-weight: bold;
                text-transform: uppercase;
            }
            tr:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            .count {
                text-align: center;
                margin-top: 20px;
                font-size: 1.3rem;
                color: #ffd700;
                text-shadow: 0 0 10px #ffd700;
            }
            .back-btn {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 15px;
                background: linear-gradient(135deg, #ffd700, #ff6b6b);
                color: #000;
                text-align: center;
                text-decoration: none;
                border-radius: 50px;
                font-weight: bold;
                font-size: 1.1rem;
                box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
                transition: all 0.3s;
            }
            .back-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 30px rgba(255, 215, 0, 0.6);
            }
        </style>
    </head>
    <body>
        <h1>⚡ SUPER ADMIN PANEL ⚡</h1>
        <p class="subtitle">Tanishka's Contact Messages</p>
        <div class="count">📨 Total Messages: {{ contacts|length }}</div>
        <a href="/" class="back-btn">🏠 Back to Portfolio</a>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
            {% for contact in contacts %}
            <tr>
                <td>{{ contact.id }}</td>
                <td>{{ contact.name }}</td>
                <td>{{ contact.email }}</td>
                <td>{{ contact.message }}</td>
                <td>{{ contact.created_at }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
    </html>
    """
    return render_template_string(html, contacts=contacts)

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# API Routes
@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate input
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        if not name or not email or not message:
            return jsonify({'error': 'All fields are required', 'success': False}), 400
        
        # Basic email validation
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email address', 'success': False}), 400
        
        # Save to database
        success = add_contact(name, email, message)
        
        if success:
            return jsonify({
                'message': 'Message sent successfully! I will get back to you soon.',
                'success': True
            }), 200
        else:
            return jsonify({'error': 'Failed to save message. Please try again.', 'success': False}), 500
            
    except Exception as e:
        print(f"Error in contact endpoint: {e}")
        return jsonify({'error': 'Internal server error', 'success': False}), 500

@app.route('/api/stats', methods=['GET'])
def stats():
    """Return visitor statistics"""
    try:
        # Increment visitor count on each visit
        visitor_count = increment_visitor_count()
        
        return jsonify({
            'visitors': visitor_count,
            'success': True
        }), 200
        
    except Exception as e:
        print(f"Error in stats endpoint: {e}")
        return jsonify({'error': 'Internal server error', 'success': False}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Server is running'
    }), 200

if __name__ == '__main__':
    print("\n" + "="*60)
    print("⚡ Starting Tanishka's Super Power Portfolio Server ⚡")
    print("="*60)
    print("📍 Local:   http://localhost:5001")
    print("📍 Network: http://127.0.0.1:5001")
    print("📍 Admin:   http://localhost:5001/admin")
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5001)
