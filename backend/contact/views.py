from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail

from .serializers import ContactSerializer


@api_view(['POST',])
@permission_classes([AllowAny])
def api_create_contact_view(request):
    if request.method == "POST":
        serializer = ContactSerializer(data=request.data)
        #print(serializer)
        if serializer.is_valid():
            #name = request.POST['name']
            #sender = request.POST['email']
            #message = request.POST['message']
            #send_mail(
            #    'Contact for cyber blog from ' + name,
            #    message,
            #    sender,
            #    ['to@example.com'],
            #    fail_silently=False,
            #)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)