from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import Blog
from blog.serializer import BlogSerializer


class BlogListView(ListAPIView):
    queryset = Blog.objects.all().order_by('date_created')
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = ( permissions.AllowAny, )

class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all().order_by('date_created')
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = ( permissions.AllowAny, )

class BlogFeaturedView(ListAPIView):
    queryset = Blog.objects.all().filter(featured=True)
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    permission_classes = ( permissions.AllowAny, )

class BlogCategoryView(APIView):
    serializer_class = BlogSerializer
    permission_classes = ( permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        category = data['category']

        queryset = Blog.objects.all().filter(category__iexact=category).order_by('date_created')

        serializer = BlogSerializer(queryset, many = True)

        return Response(serializer.data)