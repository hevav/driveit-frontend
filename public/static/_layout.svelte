<script>
    import {user} from "../api/user"
    import { WarningFilled } from "carbon-icons-svelte";
</script>

{#if $user.role == "ADMIN"}
    <slot />
{:else}
    <div class="flex items-center gap-x-3 mb-4 p-4 text-white bg-[#E4000D]">
        <WarningFilled />
        У вас нет прав
    </div>
{/if}