"""
Django settings for Thesis project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import cloudinary
import pymysql

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-#^as^1tg&w^%e+i5!x=0-#7c*b1z&#&4m#qwuj7yua(yu!x5ln'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'ThesisApp.apps.ThesisappConfig',
    'rest_framework',
    'oauth2_provider',
    'drf_yasg',
    'debug_toolbar',
    'cloudinary',
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

import pymysql

pymysql.install_as_MySQLdb()

ROOT_URLCONF = 'Thesis.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Thesis.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'thesisdb',
        'USER': 'root',
        'PASSWORD': 'Admin@123',
        'HOST': ''
    }
}

INTERNAL_IPS = [
    "127.0.0.1",
]

AUTH_USER_MODEL = 'ThesisApp.User'

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Ho_Chi_Minh'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
MEDIA_ROOT = f'{BASE_DIR}/ThesisApp/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

cloudinary.config(
    cloud_name="dnjupjumj",
    api_key="962953924372766",
    api_secret="ipZJVNE1Pe9l25ft3ZI-9AHI14E"
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    ),
    'DEFAULT_PAGINATION_CLASS': (
        'rest_framework.pagination.PageNumberPagination'),
    'PAGE_SIZE': '5'
}

# OAuth2 Pythonanywhere
CLIENT_ID = "241CnQ7mNkCafYma02PmR9b6fmFsoLR0IchRI91n"
CLIENT_SECRET = "HWtHDL1jxgomoK9o3WEwZgMI7CNu4rTrH0KLSanw7G3tGpY1qXpKtDol09vpf3ACyIqBq2pleqQRbN5pdCTiCnmywoQL8nKMBap3ZQARg6HP9A7xMmNY77zeujdz7hbu"

# OAuth2 Local
CLIENT_ID = 'CxlcnyvI3uf7U1IbM7jhxGEK1vLfvNwPlURmnHxY'
CLIENT_SECRET = '06ouPIpUe56JFN0WAUuMyhw4YcKSrEIT7k3SWVn0OOSZVD6ZDGRApd6Gp0EhSwhIBFLcJSzehoeXX5Ig301w2OxOcRcROeuOPi07Kfb4IvzwF5yKkqr0kAylgrdwE9M0'

OAUTH2_PROVIDER = {
    'OAUTH2_BACKEND_CLASS': 'oauth2_provider.oauth2_backends.JSONOAuthLibCore'
}

# CORS_ALLOW_ALL_ORIGINS = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = "kietnguyen2226@gmail.com"
EMAIL_HOST_PASSWORD = "uxnn vlnw irfh iwsm"
