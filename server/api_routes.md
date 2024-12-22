

# POST 

http://localhost:5000/api/pedidos

{
  "userId": 1,
  "productos": [
    {
      "productoId": 2,
      "cantidad": 3,
      "precio": 100.00
    },
    {
      "productoId": 5,
      "cantidad": 1,
      "precio": 50.00
    }
  ],
  "estado": "pendiente",
  "montoTotal": 350.00
}
