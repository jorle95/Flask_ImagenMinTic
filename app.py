from flask import Flask, render_template, request, redirect, url_for, Response,make_response,session,redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bd/imagenes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Imagen (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text)
    name = db.Column(db.Text)
    mimetype = db.Column(db.Text)

# Pagina de inicio
@app.route('/')
def inicio():
    return render_template('index.html')

#Agregar imagen
@app.route('/imagen',methods=["GET","POST"])
def agregar():
    #Agregar imagenes
    pic = request.files['pic']
    if not pic:
        return 'No se selecciono una imagen!', 400
    
    imagen = Imagen.query.delete()
    db.session.commit()
    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype
    if mimetype ==("image/jpeg") or mimetype ==("image/png") or mimetype==("image/jpg"):
        if not filename or not mimetype:
            return 'Archivo no soportado!', 400
    
        nueva_imagen = Imagen(img=pic.read(), name=filename, mimetype=mimetype)
        db.session.add(nueva_imagen)
        db.session.commit()
        return redirect (url_for('crear'))
    else:
        return 'Archivo diferente a jpg, jpeg o png ', 404
    

    

#Cargar imagen del link en tabla
@app.route('/imagen/<int:id>')
def get_img(id):
    img = Imagen.query.filter_by(id=id).first()
    if not img:
        return 'Img Not Found!', 404

    return Response(img.img, mimetype=img.mimetype)

#visualizar la imagen
@app.route('/imagen/crear', methods=["GET", "POST"])
def crear():
    imagenes = Imagen.query.all()
    return render_template('index.html', imagenes = imagenes)


if __name__=='__main__':
    app.run(debug=True)