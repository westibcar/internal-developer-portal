const API_URL = '/api';
let token = localStorage.getItem('token');
let currentUser = null;

// Utility Functions
function formatCNPJ(cnpj) {
    // Certifica que o CNPJ tem 14 dígitos
    cnpj = cnpj.replace(/\D/g, '').padStart(14, '0');
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Company Functions
async function loadCompanies() {
    try {
        if (!token) {
            console.warn('Token não encontrado, redirecionando para login');
            return;
        }

        const response = await fetch(`${API_URL}/companies/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao carregar empresas');
        }

        const companies = await response.json();
        const tableBody = document.getElementById('companiesTableBody');
        
        if (!tableBody) {
            console.warn('Elemento companiesTableBody não encontrado');
            return;
        }

        tableBody.innerHTML = '';

        companies.forEach(company => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.id}</td>
                <td>${company.nome_empresa}</td>
                <td>${formatCNPJ(company.cnpj)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
        showError('Erro ao carregar empresas');
    }
}

async function handleCompanySubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById('companyName');
    const cnpjInput = document.getElementById('companyCNPJ');
    
    const companyData = {
        nome_empresa: nameInput.value,
        cnpj: cnpjInput.value
    };

    try {
        const response = await fetch(`${API_URL}/companies/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar empresa');
        }

        const result = await response.json();
        showSuccess('Empresa cadastrada com sucesso!');
        nameInput.value = '';
        cnpjInput.value = '';
        await loadCompanies();
    } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
        showError('Erro ao cadastrar empresa');
    }
}

// Utility Functions
function showError(message) {
    alert(message);
}

function showSuccess(message) {
    alert(message);
}

function setToken(newToken) {
    token = newToken;
    localStorage.setItem('token', newToken);
}

// Authentication Functions
function showMainContent() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadCompanies(); // Carregar empresas ao mostrar conteúdo principal
}

async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append('username', document.getElementById('loginEmail').value);
    formData.append('password', document.getElementById('loginPassword').value);

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Login falhou');
        }

        const data = await response.json();
        setToken(data.access_token);
        await loadUserInfo();
        showMainContent();
    } catch (error) {
        console.error('Erro completo:', error);
        showError('Erro no login: ' + error.message);
        // Limpar senha após erro
        document.getElementById('loginPassword').value = '';
    }
}

async function handleRegister(event) {
    event.preventDefault();

    try {
        const genderInput = document.querySelector('input[name="gender"]:checked');
        const userData = {
            nome: document.getElementById('registerName').value,
            email: document.getElementById('registerEmail').value,
            senha: document.getElementById('registerPassword').value,
            bio: document.getElementById('registerBio').value,
            profissao: document.getElementById('registerProfession').value,
            departamento: document.getElementById('registerDepartment').value,
            genero: genderInput ? genderInput.value : 'homem'
        };

        console.log('Enviando dados de registro:', userData);
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const responseData = await response.json();
        console.log('Resposta do registro:', responseData);

        if (!response.ok) {
            throw new Error(responseData.detail || responseData.message || 'Registro falhou');
        }

        setToken(responseData.access_token);
        await loadUserInfo();
        showMainContent();
    } catch (error) {
        console.error('Erro completo:', error);
        showError('Erro no registro: ' + error.message);
        // Limpar senha após erro
        document.getElementById('registerPassword').value = '';
    }
}

function logout() {
    localStorage.removeItem('token');
    token = null;
    showLoginForm();
}

// Company Functions
async function handleCompanySubmit(event) {
    event.preventDefault();

    const companyData = {
        nome_empresa: document.getElementById('companyName').value,
        cnpj: document.getElementById('companyCNPJ').value.replace(/\D/g, '')
    };

    try {
        const response = await fetch(`${API_URL}/companies/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData)
        });

        if (!response.ok) {
            throw new Error('Falha ao cadastrar empresa');
        }

        showSuccess('Empresa cadastrada com sucesso!');
        document.getElementById('companyName').value = '';
        document.getElementById('companyCNPJ').value = '';
        await loadCompanies();
    } catch (error) {
        showError('Erro ao cadastrar empresa: ' + error.message);
    }
}

async function loadCompanies() {
    try {
        const response = await fetch(`${API_URL}/companies/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao carregar empresas');
        }

        const companies = await response.json();
        const tableBody = document.getElementById('companiesTableBody');
        if (!tableBody) {
            console.error('Elemento companiesTableBody não encontrado');
            return;
        }
        
        tableBody.innerHTML = '';
        companies.forEach(company => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.id}</td>
                <td>${company.nome_empresa}</td>
                <td>${formatCNPJ(company.cnpj)}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        showError('Erro ao carregar empresas: ' + error.message);
    }
}

// UI Functions
function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

function showLoginForm() {
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showMainContent() {
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    loadCompanies();
}

async function loadUserInfo() {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao carregar informações do usuário');
        }

        const user = await response.json();
        currentUser = user;
        document.getElementById('userName').textContent = user.nome;
        
        // Atualizar campos do formulário de perfil
        document.getElementById('updateName').value = user.nome || '';
        document.getElementById('updateBio').value = user.bio || '';
        document.getElementById('updateProfession').value = user.profissao || '';
        document.getElementById('updateDepartment').value = user.departamento || '';
        
        // Atualizar foto do perfil se existir
        const photoElement = document.getElementById('userPhoto');
        if (user.foto_perfil) {
            console.log('Carregando foto do perfil:', `${API_URL}/uploads/${user.foto_perfil}`);
            photoElement.src = `${API_URL}/uploads/${user.foto_perfil}`;
            // Adicionar listener para detectar erros no carregamento da imagem
            photoElement.onerror = () => {
                console.error('Erro ao carregar a foto do perfil');
                const defaultAvatar = user.genero === 'mulher' ? 'mulher.png' : 'homem.png';
                photoElement.src = `${API_URL}/uploads/${defaultAvatar}`;
            };
        } else {
            // Definir avatar padrão baseado no gênero
            const defaultAvatar = user.genero === 'mulher' ? 'mulher.png' : 'homem.png';
            photoElement.src = `${API_URL}/uploads/${defaultAvatar}`;
        }
    } catch (error) {
        showError('Erro ao carregar informações do usuário: ' + error.message);
    }
}

// Utility Functions
function formatCNPJ(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Profile Functions
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.classList.toggle('hidden');
}

async function handleProfileUpdate(event) {
    event.preventDefault();

    try {
        // Só inclui campos que foram preenchidos
        const formData = {
            nome: document.getElementById('updateName').value,
            bio: document.getElementById('updateBio').value,
            profissao: document.getElementById('updateProfession').value,
            departamento: document.getElementById('updateDepartment').value,
        };

        const userData = {};
        for (const [key, value] of Object.entries(formData)) {
            if (value) {
                userData[key] = value;
            }
        }

        console.log('Enviando dados:', userData);
        const response = await fetch(`${API_URL}/users/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const responseData = await response.json();
        console.log('Resposta:', responseData);

        if (!response.ok) {
            throw new Error(responseData.detail || responseData.message || 'Falha ao atualizar dados do perfil');
        }

        // Upload da foto se uma nova foi selecionada
        const photoInput = document.getElementById('profilePhoto');
        if (photoInput.files.length > 0) {
            try {
                const formData = new FormData();
                formData.append('file', photoInput.files[0]);

                console.log('Enviando foto...');
                const photoResponse = await fetch(`${API_URL}/users/me/upload-photo`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const photoResponseData = await photoResponse.json();
                console.log('Resposta do upload:', photoResponseData);
                console.log('URL completa:', `${API_URL}/uploads/${photoResponseData.filename}`);

                if (!photoResponse.ok) {
                    throw new Error(photoResponseData.detail || photoResponseData.message || 'Falha ao fazer upload da foto');
                }

                // Atualizar a foto na interface usando a URL completa da foto
                const photoUrl = `${API_URL}/uploads/${photoResponseData.filename}`;
                document.getElementById('userPhoto').src = photoUrl;
                console.log('Foto atualizada com URL:', photoUrl);
            } catch (uploadError) {
                console.error('Erro no upload:', uploadError);
                throw new Error(`Erro no upload da foto: ${uploadError.message}`);
            }
        }

        showSuccess('Perfil atualizado com sucesso!');
        await loadUserInfo();
        toggleProfileMenu();
    } catch (error) {
        console.error('Erro completo:', error);
        if (error instanceof Error) {
            showError('Erro ao atualizar perfil: ' + error.message);
        } else {
            showError('Erro ao atualizar perfil: ' + JSON.stringify(error));
        }
    }
}

function handlePhotoPreview(event) {
    const photoPreview = document.getElementById('photoPreview');
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.src = e.target.result;
            photoPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

async function handleDeleteProfile() {
    // Confirmar a exclusão
    if (!confirm('Tem certeza que deseja excluir seu perfil? Esta ação não pode ser desfeita.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/delete-profile`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Falha ao excluir perfil');
        }

        showSuccess('Perfil excluído com sucesso');
        logout(); // Redirecionar para a tela de login
    } catch (error) {
        console.error('Erro ao excluir perfil:', error);
        showError('Erro ao excluir perfil: ' + error.message);
    }
}

// Initialize
if (token) {
    loadUserInfo().then(() => {
        showMainContent();
    }).catch(() => {
        showLoginForm();
    });
} else {
    showLoginForm();
}