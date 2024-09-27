from calendar import month
from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

# Create your models here.

class Category(models.TextChoices):
    DUNYA = 'dunya'
    TEKNOLOJI = 'teknoloji'
    SAGLIK = 'saglik'
    POLITIKA = 'politika'
    BILIM = 'bilim'
    STIL = 'stil'
    KULTUR = 'kultur'
    CEVRE = 'cevre'


class Blog(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()
    category  = models.CharField(max_length=50, choices=Category.choices, default=Category.DUNYA)
    thumbnail = models.ImageField(upload_to="photos/%Y/%m/%d")
    excerpt = models.CharField(max_length=250)
    month = models.CharField(max_length=2)
    day = models.CharField(max_length=2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)


    def save(self, *args, **kwargs):

        original_slug = slugify(self.title)
        queryset = Blog.objects.all().filter(slug__iexact=original_slug).count()

        count = 1
        slug = original_slug
        while(queryset):

            slug = original_slug + "-" + str(count)
            count += 1
            queryset = Blog.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        if self.featured:
            try:
                temp = Blog.objects.get(featured=True)
                if self != temp:
                    self.featured = False
                    temp.save()

            except Blog.DoesNotExist:
                pass

        super(Blog, self).save(*args, **kwargs)

    def __str___(self):
        return self.title