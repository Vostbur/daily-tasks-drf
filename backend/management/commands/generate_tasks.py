from django.core.management.base import BaseCommand

from backend.models import Task


class Command(BaseCommand):

    def generate(self):
        Task.objects.create(name='Добавить 3 важные задачи')
        Task.objects.create(name='Добавить 5 неважных задач')
        Task.objects.create(name='Добавить 7 мелких задач')

    def handle(self, *args, **options):
        self.generate()
