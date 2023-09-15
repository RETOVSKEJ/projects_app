from django.db import models
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import EmailValidator, RegexValidator, MinLengthValidator

# CUSTOM USER MODEL

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('A password is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required')
        if not password:
            raise ValueError('a password is required')
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    GENDERS = [("Male", "Male"), ("Female", "Female")]

    phone_regex = RegexValidator(
        regex = r'^\+?\d+(-\d+)*$'
    )

    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100, unique=True, validators=[EmailValidator('email must be in the correct format')])
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    gender = models.CharField(max_length=32, choices=GENDERS)
    phone_number = models.CharField(
        max_length=16,
        null=True,
        unique=True,
        validators=[
            MinLengthValidator(3, "The phone number must be at least 3 digits long"), 
            phone_regex
        ]
    )

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AppUserManager()
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email