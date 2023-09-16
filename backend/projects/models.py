from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

UserModel = get_user_model()

# Create your models here.

class Project(models.Model):
    class Status(models.TextChoices):
        NEW = 'New', 'NEW'
        IN_PROGRESS = 'In Progress', 'IN_PROGRESS'
        PAUSED = 'Paused', 'PAUSED'
        COMPLETED = 'Completed','COMPLETED'
        DEPRECATED ='Deprecated' ,'DEPRECATED'

    creator = models.ForeignKey(UserModel, related_name='created', on_delete=models.SET_NULL, null=True)
    participants = models.ManyToManyField(UserModel, related_name='projects', blank=True)
    title = models.CharField(max_length=80)
    description = models.TextField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    date_start = models.DateField()
    date_end = models.DateField()

    def clean(self):
        if self.date_end < self.date_start:
            raise ValidationError('End Date must happen after Start Date')