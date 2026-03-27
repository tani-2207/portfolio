# ⚡ Tanishka N - Coding Super Power Portfolio

A superhero-themed portfolio website with Matrix rain effect, power particles, and full-stack database integration!

## 🚀 Features

- ⚡ **Coding Super Power Theme** - Superhero-style design with comic book elements
- 🎬 **Matrix Rain Effect** - Dynamic Matrix-style background animation
- ✨ **Power Particles** - Floating particle effects throughout the site
- 📊 **Visitor Tracking** - Real-time visitor counter stored in database
- 📬 **Contact Form** - Functional contact form with backend API
- 🎨 **Power Meters** - Animated skill power level meters
- 💫 **Lightning Effects** - Random lightning flashes for extra power
- 📱 **Fully Responsive** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Comic book/superhero theme)
- JavaScript (Canvas animations, Matrix effect, particles)

### Backend
- Python Flask (Port 5001)
- SQLite Database
- Flask-CORS

## 📁 Project Structure

```
tanishka_project/
│
├── index.html          # Main HTML file
├── style.css           # Super power theme styling
├── script.js           # Matrix effect & interactivity
├── server.py           # Flask backend (Port 5001)
├── database.py         # Database operations
├── requirements.txt    # Python dependencies
├── portfolio.db        # SQLite database (auto-generated)
├── images/             # Profile photo folder
│   └── profile.jpg     # Your profile photo
└── README.md          # This file
```

## 🚀 Quick Start

### Step 1: Install Dependencies

```powershell
pip install -r requirements.txt
```

### Step 2: Add Profile Photo

Place your photo in the `images` folder as `profile.jpg`

### Step 3: Start Backend Server

```powershell
python server.py
```

You'll see:
```
============================================================
⚡ Starting Tanishka's Super Power Portfolio Server ⚡
============================================================
📍 Local:   http://localhost:5001
📍 Network: http://127.0.0.1:5001
📍 Admin:   http://localhost:5001/admin
============================================================
```

### Step 4: Open Website

- **Using VS Code**: Open `index.html` → Right-click → "Open with Live Server"
- **Using Browser**: Navigate to `http://localhost:5001`

## 🎯 Special Features

### Matrix Rain Background
- Dynamic Matrix-style falling characters
- Adapts to screen size
- Creates a coding atmosphere

### Power Particles
- 50 floating particles with random colors
- Adds depth and movement
- Self-generating animation

### Power Meters
- Animated skill level bars
- Spark effect at the end
- HTML: 90%, CSS: 85%, JavaScript: 80%

### Lightning Flashes
- Random lightning effects every few seconds
- Creates dramatic superhero atmosphere

### Energy Rings
- Rotating rings around profile photo
- Dynamic opacity changes
- Multiple layers for depth

## 🔧 API Endpoints

### GET /api/stats
Returns visitor statistics
```json
{
  "visitors": 123,
  "success": true
}
```

### POST /api/contact
Submit contact form
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### GET /api/health
Health check
```json
{
  "status": "healthy",
  "message": "Server is running"
}
```

## 🎨 Color Scheme

```css
--power-purple: #667eea   /* Primary gradient color */
--power-pink: #764ba2     /* Secondary gradient color */
--power-gold: #ffd700     /* Accent/highlight color */
--power-orange: #ff6b6b   /* Button/CTA color */
--power-cyan: #00f2fe     /* Text highlight */
```

## 📝 Database Schema

### visitors
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| count | INTEGER | Total visitors |
| last_updated | TIMESTAMP | Last update |

### contacts
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Visitor name |
| email | TEXT | Visitor email |
| message | TEXT | Contact message |
| created_at | TIMESTAMP | Message time |

## 🐛 Troubleshooting

### Port 5001 in use?
Change the port in `server.py` (line 202) and `script.js` (line 2)

### Matrix effect not showing?
Check browser console (F12) for errors

### Backend not connecting?
- Verify Flask server is running
- Check `pip list` to confirm Flask is installed
- Try `http://localhost:5001/api/health`

## 📱 Responsive Design

- **Desktop**: Full experience with all animations
- **Tablet**: Optimized layout, hamburger menu
- **Mobile**: Stacked layout, touch-friendly

## 🌟 Special Effects

- ⚡ Matrix rain background
- ✨ Power particles floating
- 💫 Lightning flashes
- 🌀 Rotating energy rings
- 🎯 Animated power meters
- 🚀 Parallax scrolling
- 💥 Power burst effects

## 📞 Contact Information

- **Name**: Tanishka N
- **Education**: Bachelor of Computer Applications (BCA)
- **Email**: tanime2027@gmail.com
- **Phone**: 9740472245

## 🎓 Skills

- HTML5 (90% Power Level - MASTERED)
- CSS3 (85% Power Level - MASTERED)
- JavaScript (80% Power Level - ADVANCING)

## 💡 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## 📄 License

Personal portfolio project - © 2026 Tanishka N

---

**⚡ POWERED BY CODING SUPER POWERS ⚡**

Made with ❤️ and passion for coding
