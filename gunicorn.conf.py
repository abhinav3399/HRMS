import multiprocessing
import os

bind = "0.0.0.0:" + os.environ.get("PORT", "5000")
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2
timeout = 120
wsgi_app = "src.app:create_app()"
accesslog = "-"
errorlog = "-"
