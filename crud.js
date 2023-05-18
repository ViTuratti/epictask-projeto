document.querySelector("#salvar").addEventListener("click", cadastrar)

let servicos = []

window.addEventListener("load", () => {
  servicos = JSON.parse(localStorage.getItem("servicos")) || []
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", ()=> {
    let busca = document.querySelector("#busca").value
    let servicosFiltrados = servicos.filter((servico) =>{
        return servico.titulo.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar(servicosFiltrados)
})

function filtrar(servicos){
    document.querySelector("#servicos").innerHTML = ""
    servicos.forEach((servico) =>{
        document.querySelector("#servicos").innerHTML 
                    += createCard(servico)
    })
}

function atualizar(){
    document.querySelector("#servicos").innerHTML = ""
    localStorage.setItem("servicos", JSON.stringify(servicos))
    servicos.forEach((servico) =>{
        document.querySelector("#servicos").innerHTML 
                    += createCard(servico)
    })
}

function cadastrar(){
    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const servico = {
      id: Date.now(),
      titulo,
      descricao,
      categoria,
      concluida: false
    }

    if(!validar(servico.titulo, document.querySelector("#titulo"))) return
    if(!validar(servico.descricao, document.querySelector("#descricao"))) return

    servicos.push(servico)    
    
    atualizar()

    modal.hide()

}

function validar(valor, campo){
    if(valor ==""){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }

    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid") 
    return true 
    
}

function apagar(id){

  servicos = servicos.filter((servico) => {
    return servico.id != id
  })
  atualizar()

}

function concluir(id){
    let servicoEncontrado = servicos.find((servico) => {
        return servico.id == id
    })
    servicoEncontrado.concluida = true
    atualizar()
}  

function createCard(servico){
  let disabled = servico.concluida ? "disabled" : ""

    return `
    <div class="col-lg-3 col-md-6 col-12">
                <div class="card">
                    <div class="card-header">
                      ${servico.titulo}
                    </div>
                    <div class="card-body">
                      <p class="card-text">${servico.descricao}</p>
                      <p>
                        <span class="badge text-bg-warning">${servico.categoria}</span>
                    </p>
                      <a onClick="concluir(${servico.id})" href="#" class="btn btn-success ${disabled}">
                            <i class="bi bi-check-lg"></i>
                        </a>
                        <a onClick="apagar(${servico.id})" href="#" class="btn btn-danger">
                            <i class="bi bi-trash"></i>
                        </a>
                    </div>
                </div> <!-- card -->
            </div> <!-- col -->
    ` //template literals
}