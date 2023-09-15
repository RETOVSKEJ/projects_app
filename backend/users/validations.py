from rest_framework.serializers import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()



def validate_user_data(data, edit=False):
    VALID_GENDERS = [choice[0] for choice in UserModel.GENDERS]
    email = data.get('email', '').strip().lower()
    password = data.get('password', '').strip()
    age = data.get('age', '')
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    gender = data.get('gender', '')
    phone_number = data.get('phone_number', '').strip()
    
    if not edit:
        if not email or UserModel.objects.filter(email=email).exists():
            raise ValidationError({"error": "This email is wrong or already exists"})

    if not password or len(password) < 8:
        raise ValidationError({"error": "This password is too short. min. 8 characters"})
    if not age or not isinstance(age, int):
        raise ValidationError({"error": "Age must be a number"})
    if gender not in VALID_GENDERS:
        raise ValidationError({"error": f"Gender must be one of: {', '.join(VALID_GENDERS)}"})
    if not first_name or not last_name:
        raise ValidationError({"error": "First name and Last name are required"})
    if not phone_number:
        phone_number = None    # for blank=True + unique=True

    data['email'] = email
    data['password'] = password
    data['first_name'] = first_name
    data['last_name'] = last_name
    data['age'] = age
    data['gender'] = gender
    data['phone_number'] = phone_number

    return data

def validate_email(data):
    email = data.get('email')
    if not email:
        raise ValidationError('an email is required')
    return True

def validate_password(data):
    password = data.get('password')
    if not password:
        raise ValidationError('a password is required')
    return True