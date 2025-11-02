from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from django.db import connection

# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-id')
    serializer_class = TodoSerializer

    def perform_destroy(self, instance):
        instance.delete()
        self._reset_auto_id_if_empty()

    @staticmethod
    def _reset_auto_id_if_empty():
        if not Todo.objects.exists():
            with connection.cursor() as cursor:
                cursor.execute("DELETE FROM sqlite_sequence WHERE name='todos_todo';")
