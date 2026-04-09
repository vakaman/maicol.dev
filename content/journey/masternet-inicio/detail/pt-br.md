Minha jornada profissional começou na Masternet Telecom, onde atuei por mais de sete anos unindo desenvolvimento, redes e operação. Nesse período trabalhei com ERP web em PHP, automações em Python e Shell, além da manutenção de pipelines com GitLab e GitHub Actions.

Ao mesmo tempo, assumi responsabilidades fortes em infraestrutura: administração da rede do provedor, operação de BGP, OSPF e MPLS, configuração de ambientes GPON e gestão de switches L2/L3. Também mantive serviços críticos como DNS recursivo e autoritativo, FreeRadius, Apache, Nginx, bancos PostgreSQL e MySQL, além de observabilidade com Zabbix, Graylog, Grafana e PhpIPAM.

# Titulo

## titulo

### titulo 


```mermaid
sequenceDiagram
    participant FE as Web-Front
    participant KKD as KrakenD
    participant REG as Registration-Flow-Service
    participant ID as Identity-Verifier
    participant ACC as Account-Service
    participant REDIS as Redis
    participant KC as Keycloak

    Note over FE, KKD: O Frontend conhece apenas o KrakenD (Facade)

    %% ========== FASE 1: EMAIL OTP (Stateless) ==========
    FE->>KKD: POST facade.sympla.com.br/registrations/v1/otp/send {email}
    KKD->>REG: Proxy: POST /v1/otp/send {email}
    REG->>ID: POST /v1/otp/send (email)
    ID-->>REG: OK
    REG-->>KKD: 200 OK
    KKD-->>FE: 200 OK

    FE->>KKD: POST facade.sympla.com.br/registrations/v1/otp/validate {email, code}
    KKD->>REG: Proxy: POST /v1/otp/validate {email, code}
    REG->>ID: POST /v1/otp/validate (email, code)
    ID-->>REG: valid
    
    Note right of REG: Geração HMAC
    REG->>REG: Gera payload JSON {email, verified:true, exp:+5m}
    REG->>REG: Assina payload (HMAC-SHA256)
    REG-->>KKD: Retorna otpKey (Assinado)
    KKD-->>FE: otpKey

    %% ========== FASE 2: PHONE OTP (Stateless) ==========
    FE->>KKD: POST facade.sympla.com.br/registrations/v1/otp/send {phone}
    KKD->>REG: Proxy: POST /v1/otp/send {phone}
    REG->>ID: POST /v1/otp/send (phone)
    ID-->>REG: OK
    REG-->>KKD: 200 OK
    KKD-->>FE: 200 OK

    FE->>KKD: POST facade.sympla.com.br/registrations/v1/otp/validate {phone, code, otpKey}
    KKD->>REG: Proxy: POST /v1/otp/validate {phone, code, otpKey}
    
    REG->>REG: Valida assinatura HMAC & Expiração (otpKey)
    REG->>ID: POST /v1/otp/validate (phone, code)
    ID-->>REG: valid

    Note right of REG: HMAC Incrementa validação de telefone
    REG->>REG: Gera novo payload {email, phone, verified:true, exp:+5m}
    REG->>REG: Assina novo otpKey (HMAC-SHA256)
    REG-->>KKD: otpKey
    KKD-->>FE: otpKey

    %% ========== FASE 3: CRIAÇÃO DE CONTA (Stateful start) ==========
    FE->>KKD: POST facade.sympla.com.br/registrations/v1/complete {otpKey, name, email, phone, etc...}
    KKD->>REG: Proxy: POST /v1/registrations/complete
    
    REG->>REG: Valida assinatura HMAC & Expiração (otpKey)
    REG->>REG: Verifica se email + phone constam no payload como válido
    
    Note over REG, ACC: Registra no domínio de account(Canônico) 
    REG->>ACC: POST /v1/accounts {name, email, phone, etc...}
    ACC-->>REG: 201 Created {ACT_... (UUID)}

    REG->>REG: Monta payload {account_id, email, account_created_dae}
    REG->>REG: Criptografa JWE (alg: dir, enc: A256GCM)
    REG->>REDIS: SET jti(grant_token) = "unused" (TTL: 15s)
    
    REG-->>KKD: grant_token (JWE)
    KKD-->>FE: grant_token (JWE)

    %% ========== FASE 4: TROCA POR JWT (Login) ==========
    FE->>KKD: POST facade.sympla.com.br/auth/registrations/v1/token/exchange {grant_token}
    KKD->>REG: Proxy: POST /v1/token/exchange
    
    REG->>REG: Decripta JWE (Direct Encryption)
    REG->>REG: Extrai jti e account_id, email, account_created_date
    REG->>REG: valida se conta foi criada nos ultimos 5 minutos
        
    REG->>REDIS: GET jti(grant_token)
    
    REDIS-->>REG: OK
    REG->>REDIS: DEL jti (Evita Replay - Deve ser consumido uma única vez)
    
    REG->>KC: POST /realms/prod/protocol/openid-connect/token (Client Credentials)
    KC-->>REG: access_token + refresh_token (JWT)
    
    REG-->>KKD: Tokens
    KKD-->>FE: Tokens Final

```

