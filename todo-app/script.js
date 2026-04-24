const taskInput = document.getElementById('taskInput');
const listContainer = document.getElementById('taskContainer');
const emptyState = document.getElementById('emptyState');
const taskCount = document.getElementById('taskCount');

function updateUI() {
    const total = listContainer.querySelectorAll('li').length;
    const done = listContainer.querySelectorAll('li.done').length;
    taskCount.textContent = total === 0 ? '0 tasks' : `${done} of ${total} completed`;
    emptyState.style.display = total === 0 ? 'flex' : 'none';
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl group';
    taskItem.innerHTML = `
        <button class="check-btn flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all hover:border-blue-400">
            <i data-lucide="check" width="10" height="10" class="text-white hidden"></i>
        </button>
        <span class="flex-1 text-sm text-gray-700 cursor-pointer select-none">${taskText}</span>
        <button class="delete-btn text-gray-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100" onclick="deleteTask(this)">
            <i data-lucide="trash-2" width="15" height="15"></i>
        </button>`;

    listContainer.appendChild(taskItem);
    lucide.createIcons();

    taskItem.querySelector('.check-btn').addEventListener('click', function () {
        const li = this.closest('li');
        const span = li.querySelector('span');
        const checkIcon = this.querySelector('[data-lucide="check"]');
        const isDone = li.classList.toggle('done');

        if (isDone) {
            this.classList.remove('border-gray-300');
            this.classList.add('bg-blue-500', 'border-blue-500');
            checkIcon.classList.remove('hidden');
            span.classList.add('line-through', 'text-gray-400');
            span.classList.remove('text-gray-700');
        } else {
            this.classList.add('border-gray-300');
            this.classList.remove('bg-blue-500', 'border-blue-500');
            checkIcon.classList.add('hidden');
            span.classList.remove('line-through', 'text-gray-400');
            span.classList.add('text-gray-700');
        }

        saveTask();
        updateUI();
    });

    taskInput.value = '';
    saveTask();
    updateUI();
}

function deleteTask(btn) {
    btn.closest('li').remove();
    saveTask();
    updateUI();
}

function saveTask() {
    localStorage.setItem('tasks', listContainer.innerHTML);
}

function showTask() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        listContainer.innerHTML = saved;
        lucide.createIcons();
        listContainer.querySelectorAll('li').forEach(function (li) {
            li.querySelector('.check-btn').addEventListener('click', function () {
                const span = li.querySelector('span');
                const checkIcon = this.querySelector('[data-lucide="check"]');
                const isDone = li.classList.toggle('done');

                if (isDone) {
                    this.classList.remove('border-gray-300');
                    this.classList.add('bg-blue-500', 'border-blue-500');
                    checkIcon.classList.remove('hidden');
                    span.classList.add('line-through', 'text-gray-400');
                    span.classList.remove('text-gray-700');
                } else {
                    this.classList.add('border-gray-300');
                    this.classList.remove('bg-blue-500', 'border-blue-500');
                    checkIcon.classList.add('hidden');
                    span.classList.remove('line-through', 'text-gray-400');
                    span.classList.add('text-gray-700');
                }

                saveTask();
                updateUI();
            });
        });
    }
    updateUI();
}

lucide.createIcons();
showTask();