from django.urls import path, include
from .views import *

urlpatterns = [
    path('', GetUserProjects.as_view(), name='projects'),   
    path('all', GetAllProjects.as_view(), name='allProjects'),   
    path('create', PostProject.as_view(), name='createProject'),
    path('<int:pk>', GetProjectDetails.as_view(), name='project'),
    path('modify/<int:pk>', ModifyProject.as_view(), name='modifyProject')
]