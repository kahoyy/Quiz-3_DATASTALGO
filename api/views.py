from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import HelloWorldSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def hello_world(request):
    """
    Protected endpoint that returns 'Hello World'
    """
    serializer = HelloWorldSerializer({'message': 'Hello World'})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def health_check(request):
    """
    Public health check endpoint
    """
    return Response({'status': 'API is running'}, status=status.HTTP_200_OK)
