from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__" #TODO

class UserEditSerializer(serializers.ModelSerializer): 
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'first_name', 'last_name', 'age', 'gender', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        email = data.get('email')
        phone_number = data.get('phoneNumber')
        if email and self.instance.email != email and UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError({"error": "This email is wrong or already exists"})

        if phone_number and self.instance.phone_number != phone_number and UserModel.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError({"error": "This phone number is wrong or already exists"})

        return data

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # If password is included in data, set new password
        if password:
            instance.set_password(password)

        instance.save()
        return instance

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate_email(self, email):
        email = email.strip().lower()
        return email
    
    def validate(self, data):
        email = data.get("email")
        password = data.get('password')

        if not email or not password:
            raise serializers.ValidationError('Email and password are required')

        user = authenticate(username=email, password=password)
        if user and user.is_active:
            self.user = user
            return data
        
        raise serializers.ValidationError({"error": 'Incorrect email or password'})


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('user_id', 'email', 'first_name', 'last_name', 'age', 'gender', 'phone_number') 