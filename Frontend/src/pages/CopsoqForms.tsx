// CopsoqForms.tsx
//export default function CopsoqForms() {
// TODO: Implementar useState para armazenar as respostas do formulário
// TODO: Criar função handleSubmit para enviar os dados via Axios/Fetch para o backend (app.py) - Carlos

import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
export default function CopsoqForms() {
    return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Questionário COPSOQ II</CardTitle>
        </CardHeader>
        <CardContent>
          <p>O formulário será construído aqui.</p>
        </CardContent>
      </Card>
    </div>

)
}
