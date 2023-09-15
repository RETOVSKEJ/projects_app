from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

UserModel = get_user_model()

# Create your models here.

class Project(models.Model):
    class Status(models.TextChoices):
        NEW = 'NEW', 'New'
        IN_PROGRESS = 'IN_PROGRESS', 'In Progress'
        PAUSED = 'PAUSED', 'Paused'
        COMPLETED = 'COMPLETED', 'Completed'
        DEPRECATED = 'DEPRECATED', 'Deprecated'

    creator = models.ForeignKey(UserModel, related_name='created', on_delete=models.SET_NULL, null=True)
    participants = models.ManyToManyField(UserModel, related_name='projects')
    title = models.CharField(max_length=80)
    description = models.TextField()
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.NEW)
    start_date = models.DateField()
    end_date = models.DateField()

    def clean(self):
        if self.end_date < self.start_date:
            raise ValidationError('End Date must happen after Start Date')