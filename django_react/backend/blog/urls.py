from django.urls import path
from blog.views import BlogListView, BlogDetailView, BlogFeaturedView, BlogCategoryView


urlpatterns = [
    path('', BlogListView.as_view()),
    path('featured/', BlogFeaturedView.as_view()),
    path('category', BlogCategoryView.as_view()),
    path('<slug>', BlogDetailView.as_view()),
]