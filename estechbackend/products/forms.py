from django import forms

class JSONUploadForm(forms.Form):
    file = forms.FileField(label='Выберите JSON файл')
