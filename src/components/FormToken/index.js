import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import Imagemcad from "../../images/loginamico.svg";
import api from "../../api";
import { Context } from "../../Context/AuthContext";

export default function FormToken() {
  const [inputValues, setInputValues] = useState([
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
    { value: "", ref: useRef(null) },
  ]);

  const { state } = useLocation();

  const { token, tipoTabela, email } = state;

  const navigate = useNavigate();

  async function comparar() {
    let tokenCompare = "";
    inputValues.forEach((item) => {
      tokenCompare += item.value;
    });

    if (tokenCompare === token) {
      navigate("trocar-senha", {state:{tipoTabela: tipoTabela, email: email}})
    } else {
      console.log("O token não é igual")
    }
  }

  return (
    <div className="bg-white px-10 py-10 dark:bg-preto">
      <div>
        <div>
          <label className="text-lg font-semibold items-center text-gray-900 dark:text-branco">
            Token
          </label>
          {inputValues.map((input, index) => {
            return (
              <input
                key={index}
                ref={input.ref}
                value={input.value}
                placeholder="*"
                onChange={(e) => {
                  setInputValues(
                    inputValues.map((item, indexInput) => {
                      if (indexInput === index) {
                        return { ...item, value: e.target.value };
                      } else {
                        return item;
                      }
                    })
                  );

                  console.log(e.target.value);

                  if (e.target.value !== "") {
                    let position = index + 1;

                    if (position < inputValues.length) {
                      inputValues[position].ref.current.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (inputValues[index].value === "") {
                    if (e.key === "Backspace") {
                      let position = index - 1;
                      if (position >= 0) {
                        inputValues[position].ref.current.focus();
                      }
                    }
                  }
                }}
                maxLength={1}
              />
            );
          })}
        </div>
        <div className="mt-8 flex flex-col justify-center items-center">
          <button
            className="hover:bg-cyan-600 mb-6 bg-azul-hyde p-2 w-2/3 rounded-md text-white font-bold text-lg dark:text-branco"
            onClick={comparar}
          >
            {" "}
            Verficar Token
          </button>

          <p className="dark:text-branco">
            Verifique o token enviado para você via email
          </p>
        </div>
      </div>
    </div>
  );
}