<script>
    import {Form, TextInput, Button, PasswordInput,
        Select, SelectItem} from "carbon-components-svelte";
    import {Add, WarningFilled} from "carbon-icons-svelte";
    import {writable} from "svelte/store";
    import {api} from "../api/";
    import {url, goto} from "@roxi/routify";

    $: error = writable("");

    let login = "";
    let password = "";
    let firstName = "";
    let lastName = "";
    let role = "";

    const submit = (event) => {
        event.preventDefault();
        $error = "";

        api.admin.userCreateCreate({
            login: login,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: role
        }).then((res) => {
            $goto('/users/', {}, false);
        }).catch((err) => {
            $error = err;
        })
    }
</script>

<div class="flex flex-col">
    <a class="text-xs text-gray-600 mb-2" href={$url("./")}>← ВЕРНУТЬСЯ НАЗАД</a>
    <h3>Добавление пользователя</h3>
</div>

{#if $error}
    <div class="flex items-center gap-x-3 mb-4 p-4 text-white bg-[#E4000D]">
        <WarningFilled />
        {$error.response.data.message || $error.message}
    </div>
{/if}

<Form class="max-w-[36rem]" on:submit={submit}>
    <TextInput bind:value={firstName} labelText="Имя" placeholder="Иван" required />
    <TextInput bind:value={lastName} labelText="Фамилия" placeholder="Иванов" required />
    <TextInput bind:value={login} labelText="Логин" placeholder="ivan.ivanov" required />
    <PasswordInput bind:value={password} labelText="Пароль" placeholder="••••••••••••" required />
    <Select bind:selected={role} labelText="Роль">
        <SelectItem value="USER"></SelectItem>
        <SelectItem value="ADMIN"></SelectItem>
    </Select>

    <div class="mt-4 max-w-[16rem]">
        <Button class="w-full" icon={Add} type="submit">Добавить</Button>
    </div>
</Form>