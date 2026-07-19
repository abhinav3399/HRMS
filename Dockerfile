# Use official Python image
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Install system dependencies (if any)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python deps
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy application source code
COPY . ./

# Expose Flask port
EXPOSE 5000

# Environment variables
ENV FLASK_APP=src.app:create_app

# Run the app
CMD ["gunicorn", "-c", "gunicorn.conf.py", "src.app:create_app()"]
