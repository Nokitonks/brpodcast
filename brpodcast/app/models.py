from django.db import models

# Create your models here.


class Episode(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    number = models.IntegerField()
