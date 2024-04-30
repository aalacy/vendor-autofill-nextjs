import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { UserService } from "src/services";
import { EDataGrid } from "../tables/e-datagrid";
import { UserColumns } from "src/columns/user-columns";
import { initialPage } from "src/utils";
import { UpdateUser } from "./update-user";


export const ManageUsers = () => {
    const [paginationModel, setPaginationModel] = useState(initialPage);
    const [filterModel, setFilterModel] = useState([]);
    const [rowCountState, setRowCountState] = useState(0);
    const [logicOperator, setLogicOperator] = useState("");
    const [curUser, setUser] = useState();
    const [open, setOpen] = useState(false);

    const { isLoading, data: users } = useQuery({
        queryKey: [
            "getAllUsers",
            paginationModel,
            filterModel,
            logicOperator,
        ],
        queryFn: async () => {
            const { data: { result } } = await UserService.all(
                paginationModel,
                filterModel,
                logicOperator,
            );
            setRowCountState(
                (prevRowCountState) => result.total_count || prevRowCountState,
            );
            return result.items;
        },
    });

    const { data: roles } = useQuery({
        queryKey: [
            "getAllRoles",
        ],
        queryFn: async () => {
            const { data: { result } } = await UserService.getAllRoles();
            return result;
        },
    });

    const handleEdit = (user) => {
        setUser(user);
        setOpen(true)
    }

    return (
        <>
            <EDataGrid
                hideCheckbox
                initialState={{ pinnedColumns: { right: ['id'] } }}
                loading={isLoading}
                data={users}
                columns={UserColumns({ handleEdit })}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowCountState={rowCountState}
                setRowCountState={setRowCountState}
                filterModel={filterModel}
                setFilterModel={setFilterModel}
                setLogicOperator={setLogicOperator}
            />

            {open && <UpdateUser
                roles={roles}
                open={true}
                onClose={() => setOpen(false)}
                user={curUser}
            />}
        </>
    )
}