<script>
    import {Form, TextInput, Button, PasswordInput,
        Select, SelectItem} from "carbon-components-svelte";
    import {Add, WarningFilled, Edit} from "carbon-icons-svelte";
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import {api} from "../api";
    import {goto, url} from "@roxi/routify";

    $: error = writable("");

    let password = "";
    let firstName = "";
    let lastName = "";
    let role = "";

    export let id;

    onMount(() => {
        api.admin.userDetail(id).then((res) => {
            firstName = res.data.firstName;
            lastName = res.data.lastName;
            role = res.data.role;
        }).catch((err) => {
            $error = err;
        })
    })

    const submit = (event) => {
        event.preventDefault();
        $error = "";

        api.admin.userUpdateCreate({
            id: Number(id),
            password: password || undefined,
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
    <h3>Редактирование пользователя {!!id ? `№${id}` : ''}</h3>
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
    <PasswordInput bind:value={password} labelText="Пароль" placeholder="••••••••••••" />
    <Select bind:selected={role} labelText="Роль">
        <SelectItem value="USER"></SelectItem>
        <SelectItem value="ADMIN"></SelectItem>
    </Select>

    <div class="mt-4 max-w-[16rem]">
        <Button class="w-full" icon={Edit} type="submit">Обновить</Button>
    </div>
</Form>