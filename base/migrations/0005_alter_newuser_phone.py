# Generated by Django 4.0.6 on 2023-02-02 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_shippingaddress_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='phone',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]