from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

    def validate(self, data):
        """
        Check that startdate is before enddate.
        """
        if data['start_date'] > data['end_date']:
            raise serializers.ValidationError({
                "error": "Start date must be before end date."
            })
        return data