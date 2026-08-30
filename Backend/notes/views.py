from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from notes.serializers import NoteSerializer
from notes.models import Note
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class NoteView(viewsets.ModelViewSet):
    
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    
    
from notes.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics
    
class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class VoiceNoteView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def post(self , request):
        transcript = request.data.get('text')
        if not transcript:
            return Response({"error": "No transcript provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        note = Note.objects.create(user=request.user,content = transcript)
        serializer = NoteSerializer(note)
        return Response(serializer.data,status=status.HTTP_201_CREATED)