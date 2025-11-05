from flask import Flask, render_template, send_file, jsonify
import os
import json

app = Flask(__name__)

# Project data with all projects from your CV
PROJECTS_DATA = [
    {
        "id": 1,
        "title": "Wayfaro: AI-Powered Travel Companion App",
        "description": "Mobile app for discovering nearby places (restaurants, historic/religious sites, cafes, stays) with reviews, ratings, distances, seasonal events, and Wikipedia insights. Integrated AI bot for queries; backend using Flask & MongoDB.",
        "technologies": ["Python", "Flask", "MongoDB", "AI/ML", "APIs", "Mobile Development"],
        "github_url": "https://github.com/JoylineDsilva/traval_new_temp",
        "live_url": "#",
        "status": "Ongoing"
    },
    {
        "id": 2,
        "title": "Smart Indoor Plant Care System",
        "description": "Built an AI-powered system that monitors the health of indoor plants using computer vision and ML. It analyzes plant conditions in real time and gives care suggestions. Used image processing, classification models, and Python frameworks for implementation.",
        "technologies": ["Python", "Computer Vision", "Deep Learning", "OpenCV", "TensorFlow", "Image Processing"],
        "github_url": "https://github.com/JoylineDsilva/Smart_indoor_plant_system",
        "live_url": "#",
        "status": "Completed"
    },
    {
        "id": 3,
        "title": "Object Detection and Tracking System",
        "description": "Developed a real-time object detection and tracking system using YOLO and Deep SORT. Integrated OpenCV to process live video and display object IDs with high accuracy and performance.",
        "technologies": ["Python", "YOLO", "Deep SORT", "OpenCV", "Computer Vision", "Real-time Processing"],
        "github_url": "https://github.com/JoylineDsilva/Object_Detection_and_Tracking",
        "live_url": "#",
        "status": "Completed"
    },
    {
        "id": 4,
        "title": "Language Translator Web App",
        "description": "Built a web app that translates text between multiple languages. Designed a simple and clean interface and integrated translation APIs for accurate results with fast response times.",
        "technologies": ["Python", "Flask", "HTML/CSS", "JavaScript", "Translation APIs", "Web Development"],
        "github_url": "https://github.com/JoylineDsilva/Language_Translation_Tool",
        "live_url": "#",
        "status": "Completed"
    },
    {
        "id": 5,
        "title": "AI Chatbot for Sales & FAQs",
        "description": "Created a chatbot that can answer customer FAQs and assist with sales queries. Used NLP techniques to understand user input and generate proper responses with contextual understanding.",
        "technologies": ["Python", "NLP", "Machine Learning", "Chatbot", "Text Processing", "AI"],
        "github_url": "https://github.com/JoylineDsilva/Chatbot_for_FAQs_of_sales",
        "live_url": "#",
        "status": "Completed"
    },
    {
        "id": 6,
        "title": "Heart Disease Risk Prediction",
        "description": "Built an ML pipeline with preprocessing, Logistic Regression/RandomForest models, and a Flask app for real-time heart disease risk prediction with high accuracy metrics.",
        "technologies": ["Python", "Machine Learning", "Flask", "Scikit-learn", "Data Analysis", "Healthcare AI"],
        "github_url": "https://github.com/JoylineDsilva/Heart_Risk_Prediction",
        "live_url": "#",
        "status": "Completed"
    },
    {
        "id": 7,
        "title": "Endless Run Game",
        "description": "Created a 2D endless runner game in Python with smooth gameplay. Added features like obstacle avoidance, scoring system, and increasing difficulty levels for engaging user experience.",
        "technologies": ["Python", "Pygame", "Game Development", "Object-Oriented Programming", "2D Graphics"],
        "github_url": "https://github.com/JoylineDsilva/Endless_Run_Game",
        "live_url": "#",
        "status": "Completed"
    }
]

@app.route('/')
def index():
    return render_template('index.html', projects=PROJECTS_DATA)

@app.route('/download-resume')
def download_resume():
    return send_file('Joyline_Dsilva_Resume.pdf', as_attachment=True)

@app.route('/api/projects')
def get_projects():
    return jsonify(PROJECTS_DATA)

@app.route('/api/project/<int:project_id>')
def get_project(project_id):
    project = next((p for p in PROJECTS_DATA if p['id'] == project_id), None)
    return jsonify(project) if project else ('Project not found', 404)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)