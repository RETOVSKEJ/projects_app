from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, generics
from .serializers import ProjectSerializer
from .permissions import IsProjectCreator, IsProjectParticipant
from .models import Project

UserModel = get_user_model()


class GetAllProjects(APIView):
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        queryset = Project.objects.all()
        serializer = ProjectSerializer(queryset, many=True)
        return Response({"projects": serializer.data}, 200)


class GetUserProjects(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated, IsProjectParticipant)
    authentication_classes = (SessionAuthentication,)
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.projects.all()

class GetProjectDetails(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated, IsProjectParticipant)
    authentication_classes = (SessionAuthentication,)
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return self.request.user.projects.all()
        

class PostProject(generics.CreateAPIView):
    queryset = Project.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        project = serializer.save(creator=self.request.user)
        project.participants.add(self.request.user)

class ModifyProject(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsProjectCreator)
    authentication_classes = (SessionAuthentication,)
    serializer_class = ProjectSerializer

