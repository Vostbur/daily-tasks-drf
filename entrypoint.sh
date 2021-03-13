#!/bin/sh

python manage.py flush --noinput
python manage.py migrate --noinput
python manage.py generate_tasks

exec "$@"
