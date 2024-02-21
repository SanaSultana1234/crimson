# predictor.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import os

# Initializing Kaggle API Credentials
os.environ['KAGGLE_USERNAME'] = '<kaggle_username>'
os.environ['KAGGLE_KEY'] = '<kaggle_api_key>'

def load_data():
    # Download the dataset from Kaggle
    !kaggle datasets download -d <kaggle_dataset>
    # Unzip the downloaded dataset
    !unzip <kaggle_dataset>.zip
    data = pd.read_csv('menstruation_data.csv')
    return data

def train_model(data):
    X = data[['Age', 'Cycle_Length_History', 'Stress_Level']]
    y = data['Target']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor()
    model.fit(X_train, y_train)
    return model

def predict(model, input_data):
    return model.predict(input_data)