from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, exceptions
from .serializers import *
from .validations import *

UserModel = get_user_model()

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = validate_user_data(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = UserModel.objects.create_user(**clean_data),
            if user:
                return Response(serializer.data, 201)
        return Response({"error": "Bad Request"}, 400)

class UserEdit(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def put(self, request):
        if request.user != UserModel.objects.get(user_id=request.user.user_id):
            raise exceptions.PermissionDenied("You can only edit your own data.")
        
        clean_data = validate_user_data(request.data, edit=True)
        serializer = UserEditSerializer(instance=request.user, data=clean_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, 200)
        
        return Response({"error": "Bad Request"}, 400)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            login(request, serializer.user)
            user_data = UserSerializer(serializer.user).data
            return Response(user_data, 200)
        return Response(serializer.errors, status=400)

class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = () 
    def post(self, request):
        logout(request)
        return Response(status=200)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, 200)
        

class UsersView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = UserSerializer(UserModel.objects.all(), many=True)
        return Response({"users": serializer.data}, 200)
