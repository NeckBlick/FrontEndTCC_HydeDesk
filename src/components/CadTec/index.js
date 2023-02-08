import api from "../../api"
import { Link } from "react-router-dom";
import { useState } from "react";

function CadTec () {
    const [status, setStatus] = useState('');
    const [statusErro, setStatusErro] = useState('');
    const [imagem, setImagem] = useState("")
    const [user,setUser] = useState({
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        especialidade: "",
        senha: "",
        confirmsenha: "",
    })

    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const config = {
        headers: { "content-type": "multipart/form-data" },
      };
    
    const handleCad = async(e) => {
        e.preventDefault()

        try {
            let formData = new FormData();
            formData.append("nome", user.nome);
            formData.append("cpf", user.cpf);
            formData.append("email", user.email);
            formData.append("telefone", user.telefone);
            formData.append("especialidade", user.especialidade);
            formData.append("foto", imagem);
            formData.append("senha", user.senha);
            formData.append("confirmsenha", user.confirmsenha);

            console.log(formData.get("foto"))
            const { data } = await api.post('/tecnicos/cadastro', formData, config)
            console.log(data)
            setStatus(data.message)
        } catch (error) {
            setStatusErro(error.response.data.message);
        }


    }

    return (
        <div className="bg-white px-10 py-10">
            <h1 className="font-bold text-2xl">Cadastro para técnicos</h1>
            <div>
                <form encType="multipart/form">

                    <div className="mt-8">
                    <label className="text-lg font-medium text-gray-900">Nome completo</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Nome completo"
                            name="nome"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">CPF</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "CPF"
                            name="cpf"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Email</label>
                        <input
                            type="email"
                            className="border-2 w-full rounded p-2"
                            placeholder= "Email"
                            name="email"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Telefone</label>
                        <input
                            className="border-2 w-full rounded p-2"
                            placeholder= "Telefone"
                            type="tel"
                            name="telefone"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                        <label className="text-lg font-medium text-gray-900">Especialidade</label>
                        <select className="border-2 w-full rounded p-2" name="especialidade" onChange={handleUser} required>
                            <option selected disabled>Selecione uma opção</option>
                            <option value="Desenvolvedor">Desenvolvedor</option>
                            <option value="Infraestrutura">Infraestrutura</option>
                            <option value="Sistemas operacionais">Sistemas operacionais</option>
                        </select>
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Senha</label>
                        <input
                            type="password"
                            className="border-2 w-full rounded p-2"
                            placeholder="Senha"
                            name="senha"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-lg font-medium text-gray-900">Confirme sua senha</label>
                        <input
                            type="password"
                            className="border-2 w-full rounded p-2"
                            placeholder="Confirme sua senha"
                            name="confirmsenha"
                            onChange={handleUser}
                            required
                            />
                    </div>
                    <div className="mt-2">
                    <label className="text-sm font-medium text-gray-900">Selecione uma foto de perfil</label>
                        <input
                            type="file"
                            className="border-2 w-full rounded p-2"
                            placeholder="Selecione uma foto"
                            name="anexo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => setImagem(e.target.files[0])}
                            required
                            />
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG ou JPEG.</p>
                    </div>
                <div className="mt-8 flex flex-col">
                    <button type="submit" className="hover:bg-cyan-600 mb-6 bg-cyan-500 p-2 rounded-3xl text-white font-bold text-lg"
                    onClick={handleCad}
                    >Cadastre-se</button>
                    <p className={status ? "text-green-500" : "text-red-500"}>{status ? status : statusErro}</p>
                </div>
                </form>
                <div>
                    <Link className="no-underline flex items-center " to='/login'>
                        <p className="text-black font-medium mb-1">Já possui uma conta?</p>
                        <p className="ml-2 text-cyan-500 font-medium mb-1">Login</p>
                    </Link>                                  
                </div>
            </div>
        </div>
    );
}

export default CadTec