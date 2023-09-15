from rest_framework import permissions

class IsProjectCreator(permissions.BasePermission):
    """
    Custom permission to only allow the creator of a project to edit/delete it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.creator == request.user
    

class IsProjectParticipant(permissions.BasePermission):
    """
    Custom permission to only allow the creator of a project to view it.
    """

    def has_object_permission(self, request, view, obj):
        return request.user in obj.participants.all()