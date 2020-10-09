from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


def main_menu(items, admin=False):
    menu_items = [
        'blog',
        # 'musician',
        'projects'
    ]
    admin_items = [
        'create post'
    ]

    def to_url(s):
        return "-".join(item.split())

    for item in menu_items:
        items.append({
            'title': f'The {item.capitalize()}',
            'url': to_url(item),
        })
    if admin:
        for item in admin_items:
            items.append({
                'title': item.capitalize(),
                'url': to_url(item)
            })

    return items


class MenuItems(APIView):
    def get(self, request, *args, **kwargs):
        menu_items = []
        admin = False
        menus = {
            'main': main_menu,
        }
        requested_menu = kwargs['menu']
        if 'admin' in request.GET.keys():
            admin = False if request.GET['admin'] == 'false' else True
        try:
            menu_items = menus[requested_menu](menu_items, admin)
        except KeyError:
            return Response({"error": "no menu found"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(menu_items, status=status.HTTP_200_OK)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(LoginView, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'authentication': token.key, 'user': token.user_id})

