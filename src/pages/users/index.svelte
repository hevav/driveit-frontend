<script>
    import {
        StructuredList,
        StructuredListHead,
        StructuredListRow,
        StructuredListCell,
        StructuredListBody,
        Button,
        Pagination, StructuredListSkeleton,
    } from "carbon-components-svelte";
    import { Add, WarningFilled, Edit, TrashCan } from "carbon-icons-svelte";
    import { url } from "@roxi/routify";
    import { writable } from "svelte/store";
    import { api } from "../api"
    import { user } from "../api/user"

    let pageIndex = 1;
    let pageSize = 10;

    $: error = writable("");

    const removeItem = (id) => {
        api.admin.userDeleteDelete(Number(id)).then((res) => {
            document.querySelector(`[userId='${id}']`).remove()
        }).catch((err) => {
            $error = err;
        })
    }
</script>

<div class="w-full flex flex-col md:flex-row">
	<h3>Управление пользователями</h3>
	<Button size="field" icon={Add} style="margin-left: auto;"
	        href={$url("/users/add")}>
		Добавить пользователя
	</Button>
</div>

<div class="paginated-list">
    {#await api.admin.userListList({ page: pageIndex, pageSize: pageSize })}
        <StructuredListSkeleton rows={pageSize} />
    {:then response}
        {#if $error}
            <div class="flex items-center gap-x-3 mb-4 p-4 text-white bg-[#E4000D]">
                <WarningFilled />
                {$error.response.data.message || $error.message}
            </div>
        {/if}
        <StructuredList>
            <StructuredListHead>
                <StructuredListRow head>
                    <StructuredListCell head>ID</StructuredListCell>
                    <StructuredListCell head>Имя пользователя</StructuredListCell>
                    <StructuredListCell head>Логин</StructuredListCell>
                    <StructuredListCell head>Роль</StructuredListCell>
                    <StructuredListCell head>Управление</StructuredListCell>
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
                {#each response.data.items as item}
                    <StructuredListRow userId={item.id}>
                        <StructuredListCell nowrap>{item.id}</StructuredListCell>
                        <StructuredListCell>{item.firstName} {item.lastName}</StructuredListCell>
                        <StructuredListCell>{item.login}</StructuredListCell>
                        <StructuredListCell>{item.role}</StructuredListCell>
                        <StructuredListCell>
                            <Button size="small" iconDescription="Редактировать" icon={Edit} href={$url(`/users/${item.id}`)} />
                            <Button size="small" iconDescription="Удалить" icon={TrashCan}
                                disabled={item.id === $user.id} on:click={removeItem(item.id)} />
                        </StructuredListCell>
                    </StructuredListRow>
                {/each}
            </StructuredListBody>
        </StructuredList>
    {:catch e}
        <div class="flex items-center gap-x-3 mb-4 p-4 text-white bg-[#E4000D]">
            <WarningFilled />
            {e.response.data.message || e.message}
        </div>
        <StructuredListSkeleton rows={pageSize} />
    {/await}
</div>

<div class="my-[-33px]">
    <Pagination
        bind:pageSize={pageSize}
        totalItems={3} pageSizes={[10, 15, 20]}
        forwardText="Следующая станица"
        backwardText="Предыдущая страница"
        itemsPerPageText="Пользователей на странице"
        itemRangeText={(min, max, total) => `${min}–${max} из ${total} пользовател${max === 1 ? "я" : "ей"}`}
        pageRangeText={(current, total) => `из ${total} страниц${total === 1 ? "ы" : ""}`} />
</div>

