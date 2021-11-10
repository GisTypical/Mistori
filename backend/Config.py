from datetime import timedelta


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
