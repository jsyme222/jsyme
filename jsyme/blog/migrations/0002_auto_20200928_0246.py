# Generated by Django 3.1.1 on 2020-09-28 02:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Tags',
            new_name='Tag',
        ),
    ]
