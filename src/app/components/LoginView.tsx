import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { SophyLogo } from "./SophyLogo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

export function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      setError("Credenciais inválidas. Tente novamente.");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbe9ed]/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-[#ecb4bc]/40 p-8">
        <div className="flex justify-center mb-8">
          <SophyLogo tone="dark" />
        </div>
        
        <h1 className="text-2xl font-logo text-[#1f1115] text-center mb-2">
          Acesso Restrito
        </h1>
        <p className="text-center text-[#dc8494] text-sm mb-8">
          Painel administrativo Sophy Presentes
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[#3a2129]">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[#3a2129]">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#ecb4bc] focus-visible:ring-[#cf4e71]"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#cf4e71] hover:bg-[#b8425f] text-white rounded-full h-12 mt-2 shadow-md shadow-[#cf4e71]/25 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : null}
            {loading ? "Entrando..." : "Entrar no painel"}
          </Button>
        </form>
      </div>
    </div>
  );
}
