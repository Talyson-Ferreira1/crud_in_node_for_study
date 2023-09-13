
import express from "express";
import admin from "firebase-admin";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert("./cardapio-digital-40a58-firebase-adminsdk-943gd-8d7bbfc4fc.json"),
});

app.get('/', (request, response) => {
  admin.firestore()
    .collection('Produtos')
    .doc('Recomendacoes')
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        const data = snapshot.data();
        response.json(data); 
      } else {
        response.status(404).json({ message: "Documento não encontrado" });
      }
    })
    .catch(error => {
      console.error("Erro ao obter documento:", error);
      response.status(500).json({ message: "Erro ao buscar dados" });
    });
});

app.post('/:id', (request, response) => {
  const newData = request.body; // Dados para adicionar ao documento

  admin.firestore()
    .collection('Produtos')
    .doc('Recomendacoes')
    .update(newData) // Atualizar o documento com os novos dados
    .then(() => {
      response.json({ message: "Dados atualizados com sucesso" });
    })
    .catch(error => {
      console.error("Erro ao atualizar documento:", error);
      response.status(500).json({ message: "Erro ao atualizar dados" });
    });
});



app.put('/', ()=>{})

app.delete('/', ()=>{})

app.listen('3000', () => console.log("Servidor rodando na porta 3000"));
