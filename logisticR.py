#1. Import necessary libraries
import numpy as np
#2. Define the sigmoid function
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

#3. Define the cost function (log-loss)
def compute_cost(X, y, theta):
    m = len(y)
    h = sigmoid(np.dot(X, theta))
    cost = (-1/m) * (np.dot(y.T, np.log(h)) + np.dot((1 - y).T, np.log(1 - h)))
    return cost

#4. Implement parameter update using gradient descent
def gradient_descent(X, y, theta, learning_rate, iterations):
    m = len(y)
    cost_history = np.zeros(iterations)
    
    for i in range(iterations):
        h = sigmoid(np.dot(X, theta))
        gradient = np.dot(X.T, (h - y)) / m
        theta -= learning_rate * gradient
        cost_history[i] = compute_cost(X, y, theta)
    
    return theta, cost_history
#Function to predict new observations
def predict(X, theta):
    return sigmoid(np.dot(X, theta)) >= 0.5